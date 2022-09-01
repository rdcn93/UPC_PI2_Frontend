export class Usuario {
    id: number = 0;
    usuario = "";
    clave = "";
    correo = "";
    nombre = "";
    apePaterno = "";
    apeMaterno = "";
    telefono = "";
    idRol: number = 0;
    fecRegistro?: Date;
    fecModificacion?: Date;
}