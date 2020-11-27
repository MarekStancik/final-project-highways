import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, map, switchMap, take, timeout } from "rxjs/operators";

@Injectable()
export class ApiService {

    public sessionToken: string;

    constructor(private httpClient: HttpClient) { }

    public get<T = any>(path: string, params?: any, timeoutMs?: number): Observable<T> {
        return this.httpClient.get<T>(this.createRequestUrl(path), this.createRequestOptions(params)).pipe(this.createTimeoutOperator(timeoutMs), this.defaultOperator.bind(this));
    }

    public post<T = any>(path: string, body: any, params?: any, timeoutMs?: number): Observable<T> {
        return this.httpClient.post<T>(this.createRequestUrl(path), body, this.createRequestOptions(params)).pipe(this.createTimeoutOperator(timeoutMs), this.defaultOperator.bind(this));
    }

    public postWithoutAuthentication<T = any>(path: string, body: any, params?: any): Observable<T> {
        return this.httpClient.post<T>(this.createRequestUrl(path), body, this.createRequestOptions(params, false)).pipe(this.defaultOperator.bind(this));
    }

    public put(path: string, body: any, params?: any, timeoutMs?: number): Observable<void> {
        return this.httpClient.put<void>(this.createRequestUrl(path), body, this.createRequestOptions(params)).pipe(this.createTimeoutOperator(timeoutMs), this.defaultOperator.bind(this));
    }

    public delete(path: string, params?: any, timeoutMs?: number): Observable<void> {
        return this.httpClient.delete<void>(this.createRequestUrl(path), this.createRequestOptions(params)).pipe(this.createTimeoutOperator(timeoutMs), this.defaultOperator.bind(this));
    }

    public crudCreate<T = any>(path: string, object: any, params?: any): Observable<T> {
        object = this.cloneAndStripUpstreamObject(object);
        return this.post<T>(path, object, params);
    }

    public crudUpdate<T = any>(path: string, object: any, params?: any): Observable<T> {
        object = this.cloneAndStripUpstreamObject(object);
        return this.put(path, object, params).pipe(switchMap(_ => this.get<T>(path)));
    }

    private defaultOperator<T>(input: Observable<HttpResponse<T>>): Observable<T> {
        return input.pipe(
            take(1),
            map(response => response.body),
            catchError(errorResponse => this.processResponseError(errorResponse))
        );
    }

    private createTimeoutOperator<T>(timeoutMs?: number) {
        return (input: Observable<HttpResponse<T>>): Observable<HttpResponse<T>> => {
            if (timeoutMs) {
                return input.pipe(
                    timeout(timeoutMs)
                );
            }
            return input;
        };
    }

    private createRequestOptions(params?: any, includeSessionToken: boolean = true): { params: any, observe: "response", headers: HttpHeaders } {
        return {
            params: params || {},
            observe: "response",
            headers: this.createRequestHeaders()
        };
    }

    private createRequestUrl(path: string): string {
        return this.apiUrl + path;
    }

    private createRequestHeaders(includeSessionToken: boolean = true, contentType: string = "application/json"): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", contentType);
        if (includeSessionToken && this.sessionToken) {
            headers = headers.set("X-Session-Token", this.sessionToken);
        }
        return headers;
    }

    private createErrorFromResponse(response: HttpErrorResponse | TimeoutError): ApiError {
        if (response instanceof TimeoutError) {
            return new ApiError("Timeout occurred while talking to Server API. Please ensure " + this.config.apiUrl + " is reachable.", "API_UNREACHABLE");
        }
        switch (response.status) {
            case 0: return new ApiError("Unable to reach Server API. Please ensure " + this.config.apiUrl + " is reachable.", "API_UNREACHABLE");
            case 400: return new ApiError("Server reported a bad request", "BAD_REQUEST");
            case 401:
            case 403:
                return new ApiError("Server reported unauthorized request.", "UNAUTHORIZED", response.error);
            case 404: return new ApiError("Object not found.", "NOT_FOUND");
            case 409: return new ApiError("Server has reported conflict for our request.", "CONFLICT", response.error);
            case 500: return new ApiError("Server has encountered an internal programming error.", "INTERNAL_ERROR");
            case 503: return new ApiError("Remote server has reported that it's not available at the moment. Please try again later.", "SERVICE_UNAVAILABLE", response.error);
            default: {
                console.error("unknown error - dumping response");
                console.error(response);
                return new ApiError("unknown error", "UNKNOWN_ERROR");
            }
        }
    }

    private processResponseError(response: HttpErrorResponse): Observable<never> {
        const error = this.createErrorFromResponse(response);
        if (error.code === "UNAUTHORIZED" && error.data.extra && error.data.extra.reason === "SESSION_EXPIRED") {
        }
        if (error.code === "API_UNREACHABLE") {
            console.error("server api seems to be unreachable");
        } else if (error.code === "INTERNAL_ERROR") {
            console.error("remote api has encountered an internal error");
            alert("TODO: Handle internal server error!");
        }
        return throwError(error);
    }

    private cloneAndStripUpstreamObject(object: any): any {
        object = JSON.parse(JSON.stringify(object));
        if (object.id !== undefined) {
            delete object.id;
        }
        if (object.createDate !== undefined) {
            delete object.createDate;
        }
        if (object.updateDate !== undefined) {
            delete object.updateDate;
        }
        return object;
    }
}
