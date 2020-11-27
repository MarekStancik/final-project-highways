export interface SerializedError {
    message: string;
    [key: string]: any;
}

export interface SerializableError {
    serialize(): SerializedError;
}
