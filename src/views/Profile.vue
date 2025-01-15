<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>

      <!-- Contenido principal -->
      <div class="row">
        <div class="col-md-12">
          <!-- Botón de registrar -->
          <div class="d-flex justify-content-end my-3">
            <button @click="guardarUsuario" class="btn btn-primary btn-sm">
              <i class="fa fa-plus me-1"></i> Registrar Usuario
            </button>
          </div>

          <!-- Tabla de empleados -->
          <div class="card mt-4">
            <div class="card-header pb-0">
              <h6>Usuario</h6>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nombre</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Correo</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Teléfono</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Perfil</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="usuario in listaUsuarios" :key="usuario.idUsuario">
                    <td>
                      <p class="text-sm font-weight-bold mb-0">{{ usuario.nombre }}</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">{{ usuario.correo }}</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">{{ usuario.telefono }}</p>
                    </td>
                    <td>
                      <span :class="'badge badge-sm bg-gradient-' + (usuario.perfil === 'Administrador' ? 'primary' : 'secondary')">{{ usuario.perfil }}</span>
                    </td>
                    <td>
                      <button @click="verUsuario(usuario.idUsuario)" class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-eye text-info"></i>
                      </button>
                      <button @click="editarUsuario(usuario.idUsuario)" class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-edit text-primary"></i>
                      </button>
                      <button @click="eliminarUsuario(usuario.idUsuario)" class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      listaUsuarios: []
    };
  },
  mounted() {
    this.obtenerUsuarios();
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const response = await axios.get('http://localhost:5169/api/Usuario/Lista');
        this.listaUsuarios = response.data.response;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    async guardarUsuario() {
      // Redirigir a la ruta UsuarioRegistro
      this.$router.push({ name: 'UsuarioRegistro' });
    },
    async editarUsuario(idUsuario) {
      console.log(`Editar Usuario: ${idUsuario}`);
    },
    async eliminarUsuario(idUsuario) {
      try {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "¡Este cambio no se puede deshacer!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {
          await axios.delete(`http://localhost:5069/api/Usuario/Eliminar/${idUsuario}`);
          await this.obtenerUsuarios();  // Actualizar lista después de eliminar
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire(
          'Error!',
          'Hubo un problema al eliminar el usuario.',
          'error'
        );
      }
    },
    async verUsuario(idUsuario) {
      console.log(`Ver Usuario: ${idUsuario}`);
      // Lógica para mostrar los detalles del usuario
    }
  }
};
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
</style>
