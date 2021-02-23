<template>
  <!-- <div class="row"> -->
  <div class="index container row">
    <ul class="col s12">
      <li>
        <div class="card" v-for="recipe in recipes" v-bind:key="recipe.id">
          <i class="material-icons delete card-button" v-on:click="deleteRecipe(recipe.id)">delete</i>
          <div class="card-content">
            <h2 class="indigo-text">{{ recipe.title }}</h2>
            <ul class="ingredients">
              <li
                v-for="ingredient in recipe.ingredients"
                v-bind:key="ingredient.index"
              >
                <span class="chip">{{ ingredient }} </span>
              </li>
            </ul>
            <div class="instructions">{{ recipe.instructions }}</div>
          </div>
          <router-link
            v-bind:to="{
              name: 'EditRecipe',
              params: { recipe_slug: recipe.slug },
            }"
          >
            <i class="material-icons edit card-button">edit </i>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
  <!-- </div> -->
</template>



<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      recipes: [],
    };
  },

  methods: {
    deleteRecipe(id) {
      db.collection("recipes")
        .doc(id)
        .delete()
        .then(() => (this.recipes = this.recipes.filter((r) => r.id != id)));
    },
  },

  created() {
    //fetch data from the Firestore
    db.collection("recipes")
      .get()
      .then((snapshot) => {
        snapshot.forEach((recipeObject) => {
          let currentRecipe = recipeObject.data();
          currentRecipe.id = recipeObject.id;
          this.recipes.push(currentRecipe);
        });
        this.recipes.sort((a, b) => a.title.localeCompare(b.title));
      });
  },
};
</script>

<style scoped>
.index {
  margin-top: 60px;
}
h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

ul {
  text-align: center;
}

.ingredients {
  text-align: center;
}

.ingredients li {
  display: inline-block;
}

.instructions {
  font-style: italic;
  text-align: center;
}

/* .card{
  padding: 20px;
  margin: 20px;
} */

.card-button {
  position: absolute;
  cursor: pointer;
  color: #aaa;
}
.delete {
  top: 4px;
  right: 4px;
}
.edit {
  bottom: 4px;
  right: 4px;
}
</style>
