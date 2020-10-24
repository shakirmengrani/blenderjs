export const SuccessMsg = {
    CREATE: "created",
    UPDATE: "edited",
    DELETE: "removed"

}

export const ErrorMsg = {
    UN_AUTHORIZE: "Un-authorized User",
    ACCESS_DENIED: "Access denied",
    ROUTE_NOT_FOUND: "Route not found",
    NOT_FOUND: "Data not found",
    SERVER_ERROR: "Server Error",
    TOKEN_EXPIRED: "token has beed expired",
    UN_RECOGNIZED_TOKEN: "un-recognized token",
    DATABASE_CONNECTION_FAILED: "Database connection failed",
    USER_NOT_FOUND: "User not found"
}


export function Success(code: string, module: string){
    return `${module} has been ${code} successfully` 
}

export function Error(code: string){
    return `${code}`
}