#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify
from flask import request
# Instalar con pip install flask-cors
from flask_cors import CORS
# Instalar con pip install mysql-connector-python
import mysql.connector
# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename
# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------


app = Flask(__name__)
CORS(app) # Esto habilitará CORS para todas las rutas


class Catalogo:
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        
        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err


        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS personas (
            codigo INT,
            nombre VARCHAR(255) NOT NULL,
            apellido VARCHAR(255) NOT NULL,
            dni INT NOT NULL)''')
        self.conn.commit()


        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)


    #----------------------------------------------------------------
    def listar_persona(self):
        self.cursor.execute("SELECT * FROM personas")
        personas = self.cursor.fetchall()
        return personas


    #----------------------------------------------------------------
    def consultar_persona(self, codigo):
        # Consultamos una persona a partir de su código
        self.cursor.execute(f"SELECT * FROM personas WHERE codigo = {codigo}")
        return self.cursor.fetchone()


    #----------------------------------------------------------------
    def mostrar_persona(self, codigo):
        # Mostramos los datos de una persona a partir de su código
        persona = self.consultar_persona(codigo)
        if persona:
            print("-" * 40)
            print(f"Código.....: {persona['codigo']}")
            print(f"Nombre.....: {persona['nombre']}")
            print(f"Apellido...: {persona['apellido']}")
            print(f"DNI........: {persona['dni']}")
            print("-" * 40)
        else:
            print("Persona no encontrada.")
    #----------------------------------------------------------------
    def agregar_persona(self, codigo, nombre, apellido, dni):


        self.cursor.execute(f"SELECT * FROM personas WHERE codigo = {codigo}")
        persona_existe = self.cursor.fetchone()
        if persona_existe:
            return False
        
        sql = "INSERT INTO personas (codigo, nombre, apellido, dni) VALUES (%s, %s, %s, %s)"
        valores = (codigo, nombre, apellido, dni)
        self.cursor.execute(sql,valores)
        self.conn.commit()
        return True

    #----------------------------------------------------------------
    def eliminar_persona(self, codigo):
        # Eliminamos una persona de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM personas WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def modificar_persona(self, codigo, nuevo_nombre, nuevo_apellido, nuevo_dni):
        sql = "UPDATE personas SET nombre = %s, apellido = %s, dni = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_dni, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0


#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host='localhost', user='root', password='', database='miapp')


# Carpeta para guardar las imagenes
ruta_destino = 'static/img/'


#--------------------------------------------------------------------
@app.route("/suscriptores", methods=["GET"])
def listar_persona():
    personas = catalogo.listar_persona()
    return jsonify(personas)


#--------------------------------------------------------------------
@app.route("/form/<int:codigo>", methods=["GET"])
def mostrar_persona(codigo):
    catalogo.mostrar_persona(codigo)
    persona = catalogo.consultar_persona(codigo)
    if persona:
        return jsonify(persona)
    else:
        return "Persona no encontrado", 404


@app.route("/form", methods=["POST"])
def agregar_persona():
    # Recojo los datos del form
    codigo = request.form['codigo']
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    dni = request.form['dni']
   


   # nombre_base, extension = os.path.splitext(nombre_imagen)
   # nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
   # imagen.save(os.path.join(ruta_destino, nombre_imagen))


    if catalogo.agregar_persona(codigo, nombre, apellido, dni):
        return jsonify({"mensaje": "Persona agregada"}), 201
    else:
        return jsonify({"mensaje": "Persona ya existente"}), 400


@app.route("/form/<int:codigo>", methods=["DELETE"])
def eliminar_persona(codigo):
    # Primero, obtén la información del producto para encontrar la imagen
    persona = catalogo.consultar_persona(codigo)
    if persona:
        # Eliminar la imagen asociada si existe
       # ruta_imagen = os.path.join(ruta_destino, producto['imagen_url'])
       # if os.path.exists(ruta_imagen):
       #     os.remove(ruta_imagen)


        # Luego, elimina el producto del catálogo
        if catalogo.eliminar_persona(codigo):
            return jsonify({"mensaje": "Persona eliminada"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar la persona"}), 500
    else:
        return jsonify({"mensaje": "Persona no encontrada"}), 404


@app.route("/form/<int:codigo>", methods=["PUT"])
def modificar_persona(codigo):
    # Recojo los datos del form
    nuevo_nombre = request.form.get("nombre")
    nuevo_apellido = request.form.get("apellido")
    nuevo_dni = request.form.get("dni")


    # Procesamiento de la imagen
   # imagen = request.files['imagen']
   # nombre_imagen = secure_filename(imagen.filename)
   # nombre_base, extension = os.path.splitext(nombre_imagen)
   # nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
   # imagen.save(os.path.join(ruta_destino, nombre_imagen))
    
    # Actualización del producto
    if catalogo.modificar_persona(codigo, nuevo_nombre, nuevo_apellido, nuevo_dni):
        return jsonify({"mensaje": "Persona modificada"}), 200
    else:
        return jsonify({"mensaje": "Persona no encontrada"}), 404


if __name__ == "__main__":
    app.run(debug=True)