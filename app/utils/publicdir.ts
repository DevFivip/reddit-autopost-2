interface FileCustomer {
    public_customer: string,
    prefix: string,
    public_dir_save: string,
}

export const __public = (idCliente: string): FileCustomer => {
    let dir = {
        public_customer: "",
        prefix: "",
        public_dir_save: ""
    }

    if (process.env.NODE_ENV === 'production') {
        dir = {
            public_customer: `./public/uploads/${idCliente}`,//? NICE ✅
            public_dir_save: `./public/uploads/${idCliente}`,//? NICE ✅
            prefix: `/uploads/${idCliente}`//? NICE ✅
        }
    } else {
        dir = {
            public_customer: `./public/uploads/${idCliente}`,
            public_dir_save: `./public/uploads/${idCliente}`, //? NICE ✅
            prefix: `/uploads/${idCliente}` //? NICE ✅
        }
    }

    return dir;


}