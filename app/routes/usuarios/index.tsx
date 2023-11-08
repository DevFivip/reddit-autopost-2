import { useLoaderData } from "@remix-run/react";
type Usuario = {
    id: number,
    name: string
}
export const loader = () => {
    const usuarios: Usuario[] = [
        {
            id: 1,
            name: 'Adolfo Gonzalez',
        },
        {
            id: 2,
            name: 'Adolfo Guillermo Gbztt',
        },

    ]
    return usuarios;
}

export default function Usuarios() {
    const usuarios = useLoaderData<Usuario[]>();
    return (<>
        <p>Hola</p>
        <ul>
            {usuarios.map((u, k) => <li key={k}>{u.name}</li>)}
        </ul>
    </>)
}