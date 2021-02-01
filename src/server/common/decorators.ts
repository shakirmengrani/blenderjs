import ctx from "../context"

export function Route(method: string, path: string, is_exampt: boolean = false){
    return function(target, propertyKey: string, descriptor: PropertyDescriptor){
        ctx.routes.push({method, target: target.constructor.name, path, handler: descriptor.value, is_exampt})
    }
}


export function Controller(name: string | null = null, is_secure: boolean = false){
    return function<T extends { new (...args: any[]): {} }>(target: T){
        ctx.controllers[target.name] = {name: name ? name : target.name, is_secure}
    }
}
