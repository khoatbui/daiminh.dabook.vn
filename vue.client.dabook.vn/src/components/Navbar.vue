//src/components/Navbar.vue
<template>
    <div>
      <nav class="navbar sticky-top navbar-light bg-white border-top">
  <a class="nav-item d-flex flex-column justify-content-center align-items-center" href="#">
    <img class="nav-icon" src="img/main_logo_only_color.png" alt="">
    <span>Home</span>
  </a>
  <a class="nav-item active d-flex flex-column justify-content-center align-items-center" href="#">
    <font-awesome-icon class="nav-icon-fa" icon="search-location" />
     <span>Search</span>
  </a>
  <a class="nav-item d-flex flex-column justify-content-center align-items-center" href="#">
    <font-awesome-icon class="nav-icon-fa" :icon="['far', 'user-circle']" />
     <span>Login</span>
  </a>
</nav>
    </div>  
</template>
<script>
export default {
    data() {
        return {
           
        }
    },
  methods: {
    
  }
}    
</script>
<style lang="scss">
.nav-icon{
  height: 20px;
}
.nav-item:hover{
  text-decoration: none;
}
.nav-item:hover>.nav-icon-fa,.nav-item:hover>span,.nav-icon-fa:hover,.nav-item span:hover{
  color: #007bff;
  text-decoration: none;
}
.nav-item.active>.nav-icon-fa,.nav-item.active>span{
color: #007bff;
}
.nav-icon-fa,.nav-item span{
  font-size: 1.2rem;
  font-weight: 20;
  color: #224E6A;
}
.nav-item span{
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
