import { useParams } from "@remix-run/react";

export default function DashboardClienteLayout() {
    const { idCliente } = useParams()
    return (<> {'Hola'} <br /> {idCliente} </>);
}
