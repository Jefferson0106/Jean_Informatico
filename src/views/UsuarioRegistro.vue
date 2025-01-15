<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2"; // Importar SweetAlert2

// Obtén el router al principio del componente
const router = useRouter();

// Variables para el formulario
const nombre = ref("");
const correo = ref("");
const clave = ref("");
const telefono = ref("");
const idPerfil = ref(null); // Agregar idPerfil como referencia
const loading = ref(false);
const errorMessage = ref("");

// Función para registrar usuario
const registrarUsuario = async () => {
  if (!nombre.value || !correo.value || !clave.value || !telefono.value || idPerfil.value === null) {
    errorMessage.value = "Por favor, completa todos los campos.";
    return;
  }

  const usuario = {
    nombre: nombre.value,
    correo: correo.value,
    clave: clave.value,
    telefono: telefono.value,
    idPerfil: idPerfil.value
  };

  try {
    loading.value = true;
    const response = await axios.post("http://localhost:5169/api/Usuario/Guardar", usuario);
    if (response.status === 200) {
      // Mostrar mensaje de confirmación
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con éxito",
        text: "El usuario ha sido creado correctamente.",
        confirmButtonText: "Aceptar"
      }).then(() => {
        // Redirigir a la página /tables después de que el usuario cierre el mensaje
        router.push("/tables");
      });
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    errorMessage.value = "Ocurrió un error al registrar el usuario.";
  } finally {
    loading.value = false;
  }
};

// Función para obtener la lista de perfiles
const getPerfiles = async () => {
  try {
    const response = await axios.get("http://localhost:5169/api/Perfile/Lista");
    return response.data.response;
  } catch (error) {
    console.error("Error al obtener la lista de perfiles:", error);
    return [];
  }
};

const perfiles = getPerfiles(); // Cargar los perfiles al inicio
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="page-header min-height-300"
        style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');">
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card mt-4">
            <div class="card-header pb-0">
              <h6>Registrar Usuario</h6>
            </div>
            <div class="card-body">
              <!-- Mostrar mensaje de error si hay alguno -->
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>

              <form @submit.prevent="registrarUsuario">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" v-model="nombre" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="correo" class="form-label">Correo</label>
                  <input type="email" id="correo" v-model="correo" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="clave" class="form-label">Clave</label>
                  <input type="password" id="clave" v-model="clave" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input type="tel" id="telefono" v-model="telefono" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="idPerfil" class="form-label">Perfil</label>
                  <select id="idPerfil" v-model="idPerfil" class="form-select" required>
                    <option value="" disabled selected>Selecciona un perfil</option>
                    <option v-for="perfil in perfiles" :key="perfil.idPerfil" :value="perfil.idPerfil">
                      {{ perfil.nombre }}
                    </option>
                  </select>
                </div>

                <div class="d-flex justify-content-end">
                  <button :disabled="loading" class="btn btn-primary">
                    <span v-if="loading">Guardando...</span>
                    <span v-else>Registrar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
</style>
