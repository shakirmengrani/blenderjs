// const i18n = require("i18n")
export const excludeOthers = (obj: object, keys: Array<string>=[]): Array<object> => {
    if(Array.isArray(obj)){
        return Object.assign({}, obj).map((item: object) => {
            keys.forEach((key: string) => {
                if(item.hasOwnProperty(key)){
                }else{
                    delete item[key];
                }
            });
            return item;
        });
    }else{
        return [Object.assign({}, obj)].map((item: object) => {
            keys.forEach((key: string) => {
                if(item.hasOwnProperty(key)){
                }else{
                    delete item[key];
                }
            });
            return item;
        });
    }
}

export const removeFromObject = (obj: object, keys: Array<string>=[]): Array<object> => {
    if(Array.isArray(obj)){
        return Object.assign([], obj).map((item: object) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                    delete item[key];
                }
            });
            return item;
        });
    }else{
        return [Object.assign({}, obj)].map((item) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                    delete item[key];
                }
            });
            return item;
        });
    }
}


export const retainFromObject = (obj: object, keys: Array<string>=[]): Array<object> => {
    if(Array.isArray(obj)){
        return Object.assign([], obj).map((item: object) => {
            let resObj: object = {};
            keys.forEach((key: string) => {
                if(item.hasOwnProperty(key)){
                    resObj[key] = item[key];
                }
            });
            return resObj;
        });
    }else{
        return [Object.assign({}, obj)].map((item) => {
            let resObj: object = {};
            keys.forEach((key: string) => {
                if(item.hasOwnProperty(key)){
                    resObj[key] = item[key];
                }
            });
            return resObj;
        });
    }
}

export const makeStringify = (obj: any, keys: Array<string | number>=[]) => {
    keys.forEach((key: string | number) => {
        if(obj.hasOwnProperty(key)){
            obj[key] = JSON.stringify(obj[key])
        }
    })
    return obj
}

// export const transformFields = (req, obj, fields = {}) => {
//     Object.keys(fields).forEach((key) => {
//         let objKey = fields[key][i18n.getLocale(req)];
//         if(obj.hasOwnProperty(objKey)){
//             obj[key] = obj[objKey]
//         }
//     })
//     return obj
// }

export const getUniqueArray = (array: Array<any>, key: string | number) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if (!map.has(item[key])) {
            map.set(item[key], true);    // set any value to Map
            result.push(item);
        }
    }
    return result;
}

export const shuffleArray = (array: Array<any>) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}