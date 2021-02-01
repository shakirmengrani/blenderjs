export const SuccessMsg = {
    CREATE: "created",
    UPDATE: "edited",
    DELETE: "removed"

}

export const ErrorMsg = {
    UN_AUTHORIZE: "401 Un-authorized User",
    ACCESS_DENIED: "401 Access denied",
    ROUTE_NOT_FOUND: "404 Route not found",
    NOT_FOUND: "404 Data not found",
    SERVER_ERROR: "500 Server Error",
    TOKEN_EXPIRED: "401 Token has beed expired",
    UN_RECOGNIZED_TOKEN: "401 Un-recognized token",
    DATABASE_CONNECTION_FAILED: "500 Database connection failed",
    USER_NOT_FOUND: "404 User not found",
    YET_NOT_IMPL: "404 Yet not implemented",
    INVALID: "422 Unprocessable request"
}


export function Success(code: string, module: string){
    return `${module} has been ${code} successfully` 
}

export function Error(code: string){
    return !isNaN(parseInt(code.split(" ")[0].substr(0,3))) ? `${code}` : ErrorMsg.SERVER_ERROR
}