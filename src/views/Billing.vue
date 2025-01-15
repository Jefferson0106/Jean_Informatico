<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

const body = document.getElementsByTagName("body")[0];
const store = useStore();

onMounted(() => {
  store.state.isAbsolute = true;
  setNavPills();
  setTooltip();
});

onBeforeMount(() => {
  store.state.imageLayout = "profile-overview";
  store.state.showNavbar = false;
  store.state.showFooter = true;
  store.state.hideConfigButton = true;
  body.classList.add("profile-overview");
});

onBeforeUnmount(() => {
  store.state.isAbsolute = false;
  store.state.imageLayout = "default";
  store.state.showNavbar = true;
  store.state.showFooter = true;
  store.state.hideConfigButton = false;
  body.classList.remove("profile-overview");
});
</script>

<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url(&quot;https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80&quot;);
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
            <button class="btn btn-primary btn-sm">
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
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rol</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p class="text-sm font-weight-bold mb-0">Juan Pérez</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">juanperez@gmail.com</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">04125357212</p>
                    </td>
                    <td>
                      <span class="badge badge-sm bg-gradient-success">Asesor</span>
                    </td>
                    <td>
                      <button class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-eye text-success"></i>
                      </button>
                      <button class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-edit text-primary"></i>
                      </button>
                      <button class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="text-sm font-weight-bold mb-0">María López</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">maria.lopez@example.com</p>
                    </td>
                    <td>
                      <p class="text-sm text-secondary mb-0">04145556789</p>
                    </td>
                    <td>
                      <span class="badge badge-sm bg-gradient-info">Gerente</span>
                    </td>
                    <td>
                      <button class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-eye text-success"></i>
                      </button>
                      <button class="btn btn-link text-secondary mb-0">
                        <i class="fa fa-edit text-primary"></i>
                      </button>
                      <button class="btn btn-link text-secondary mb-0">
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
