
// https://github.com/jayphelps/core-decorators/issues/148

export const nonenumerable = (target: any, propertyKey: string) => {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    if (descriptor.enumerable !== false) {
        Object.defineProperty(target, propertyKey, {
            enumerable: false,
            set(value: any) {
                Object.defineProperty(this, propertyKey, {
                    enumerable: false,
                    writable: true,
                    value
                });
            }
        })
    }
};
