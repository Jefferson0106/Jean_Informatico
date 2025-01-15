<template>
  <main>
    <div class="container-fluid">
      <div class="page-header min-height-300" 
           style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'); 
                  margin-right: -24px; margin-left: -34%;">
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <div class="row">
        <div class="col-md-12">
          <!-- Envolvemos el botón en un router-link para la navegación -->
          <div class="d-flex justify-content-end my-3">
            <router-link to="/RegistroPerfil" class="btn btn-primary btn-sm">
              <i class="fa fa-plus me-1"></i> Registrar Perfil
            </router-link>
          </div>

          <div class="card mt-4">
            <div class="card-header pb-0">
              <h6>Perfiles</h6>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nombre</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripción</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Mostrar mensaje de carga -->
                  <tr v-if="loading">
                    <td colspan="3" class="text-center">
                      <span>Cargando...</span>
                    </td>
                  </tr>

                  <!-- Mostrar perfiles -->
                  <tr v-for="perfil in paginatedPerfiles" :key="perfil.idPerfil">
                    <td>
                      <p class="text-sm font-weight-bold mb-0">{{ perfil.nombre }}</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">{{ perfil.descripcion }}</p>
                    </td>
                    <td>
                      <button @click="showProfileDetails(perfil.idPerfil)" class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-eye text-success"></i>
                      </button>
                      <button @click="goToEditPage(perfil.idPerfil)" class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-edit text-primary"></i>
                      </button>
                      <button class="btn btn-link text-secondary mb-0" @click="confirmDelete(perfil.idPerfil)">
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>

                  <!-- Mostrar mensaje si no hay perfiles -->
                  <tr v-if="!loading && perfiles.length === 0">
                    <td colspan="3" class="text-center">
                      <span>No hay perfiles disponibles</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Paginación -->
          <div class="d-flex justify-content-center my-4">
            <button
              class="btn btn-outline-secondary btn-sm"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              <i class="fa fa-chevron-left"></i>
            </button>

            <button
              class="btn btn-outline-secondary btn-sm mx-2"
              :class="{ 'active': currentPage === page }"
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              class="btn btn-outline-secondary btn-sm"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>

          <!-- Opciones de items por página -->

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';  // Importa useRouter

const perfiles = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(5);

const fetchPerfiles = async () => {
  try {
    loading.value = true;
    const response = await axios.get("http://localhost:5169/api/Perfile/Lista");
    if (response.data && response.data.response) {
      perfiles.value = response.data.response;
    }
  } catch (error) {
    console.error("Error al obtener la lista de perfiles:", error);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = async (idPerfil) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este perfil será eliminado permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminarlo!',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:5169/api/Perfile/Eliminar/${idPerfil}`);
      Swal.fire('Eliminado!', 'El perfil ha sido eliminado.', 'success');
      fetchPerfiles(); // Recargar la lista de perfiles
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire('Error', 'El perfil está en uso por un usuario y no se puede eliminar.', 'error');
      } else {
        Swal.fire('Error', 'Hubo un problema al eliminar el perfil.', 'error');
      }
    }
  }
};

const showProfileDetails = async (idPerfil) => {
  try {
    const response = await axios.get(`http://localhost:5169/api/Perfile/Obtener/${idPerfil}`);
    if (response.data && response.data.response) {
      const perfil = response.data.response;
      Swal.fire({
        title: `Perfil: ${perfil.nombre}`,
        html: `
          <p>Nombre: ${perfil.nombre}</p>
          <p>Descripción: ${perfil.descripcion}</p>
        `,
        icon: 'info',
      });
    }
  } catch (error) {
    console.error("Error al obtener detalles del perfil:", error);
    Swal.fire('Error', 'Hubo un problema al obtener los detalles del perfil.', 'error');
  }
};

const goToEditPage = (idPerfil) => {
  const router = useRouter();  // Llamada correcta a useRouter()
  if (router) {
    router.push({ name: '/PerfilEditar', params: { idPerfil } });  // Usa un objeto con 'name' y 'params'
  } else {
    console.error('Router no disponible');
  }
};

const paginatedPerfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return perfiles.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(perfiles.value.length / itemsPerPage.value));

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  fetchPerfiles();
});
</script>




<style scoped>
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  vertical-align: middle;
}

.badge {
  font-size: 12px;
  border-radius: 8px;
  padding: 4px 8px;
}

.btn-link {
  font-size: 16px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* Paginación */
.btn-outline-secondary {
  border-radius: 50%;
  padding: 6px 12px;
  font-size: 14px;
}

.btn-outline-secondary.active {
  background-color: #28a745;
  color: white;
}

select.form-select {
  width: auto;
}

select.form-select-sm {
  width: auto;
}

select.form-select:focus {
  border-color: #28a745;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}
</style>
