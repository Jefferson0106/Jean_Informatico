<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2"; // Importar SweetAlert2

// Obtén el router al principio del componente
const router = useRouter();

// Variables para el formulario
const nombre = ref("");
const descripcion = ref("");
const loading = ref(false);
const errorMessage = ref("");

// Función para registrar perfil
const registrarPerfil = async () => {
  if (!nombre.value || !descripcion.value) {
    errorMessage.value = "Por favor, completa todos los campos.";
    return;
  }

  if (descripcion.value.length <= 50) {
    errorMessage.value = "La descripción debe tener más de 50 caracteres.";
    return;
  }

  const perfil = {
    nombre: nombre.value,
    descripcion: descripcion.value
  };

  try {
    loading.value = true;
    const response = await axios.post("http://localhost:5169/api/Perfile/Guardar", perfil);
    if (response.status === 200) {
      // Mostrar mensaje de confirmación
      Swal.fire({
        icon: "success",
        title: "Perfil registrado con éxito",
        text: "El perfil ha sido creado correctamente.",
        confirmButtonText: "Aceptar"
      }).then(() => {
        // Redirigir a la página /tables después de que el usuario cierre el mensaje
        router.push("/tables");
      });
    }
  } catch (error) {
    console.error("Error al registrar el perfil:", error);
    errorMessage.value = "Ocurrió un error al registrar el perfil.";
  } finally {
    loading.value = false;
  }
};

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
              <h6>Registrar Perfil</h6>
            </div>
            <div class="card-body">
              <!-- Mostrar mensaje de error si hay alguno -->
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>

              <form @submit.prevent="registrarPerfil">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" v-model="nombre" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="descripcion" class="form-label">Descripción</label>
                  <textarea id="descripcion" v-model="descripcion" class="form-control" required></textarea>
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
