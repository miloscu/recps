<template>
  <div class="add-recipe center-block">
    <h2 class="center-align indigo-text">Add Recipe</h2>
    <form v-on:submit.prevent="addRecipe()">
      <div class="field title">
        <label for="title">Recipe title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <ul>
          <li
            class="inline-list"
            v-for="(ingredient, index) in ingredients"
            v-bind:key="index"
          >
            <button
              class="btn-small chip white"
              v-on:click="deleteIngredient(ingredient)"
            >
              {{ ingredient }}
            </button>
          </li>
        </ul>
        <input
          type="text"
          name="add-ingredient"
          v-on:keydown.enter.prevent="addIngredient"
          v-model="another"
        />
      </div>
      <div class="field instructions">
        <label for="title">Write the instructions</label>
        <input type="text" name="instructions" v-model="instructions" />
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="pink-text">{{ feedback }}</p>
        <button v-bind:class="{ disabled: isIncomplete() }" class="btn pink">
          Add recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddRecipe",
  data() {
    return {
      title: null,
      ingredients: [],
      instructions: null,
      another: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    deleteIngredient(ingredientToDelete) {
      this.ingredients = this.ingredients.filter(
        (i) => i != ingredientToDelete
      );
    },

    isIncomplete() {
      return (
        this.ingredients.length == 0 ||
        this.title == null ||
        this.instructions == null
      );
    },
    addRecipe() {
      if (!this.isIncomplete()) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[!@#$%^&*()_+]/g,
          lower: true,
        });
        db.collection("recipes")
          .doc()
          .set({
            title: this.title,
            ingredients: this.ingredients,
            instructions: this.instructions,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Index" });
            this.title = null;
            this.ingredients = [];
            this.instructions = null;
          })
          .catch((err) => console.log(err));
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else if (this.ingredients.length == 0) {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
  },
};
</script>

<style scoped>
.add-recipe {
  margin: 60 px;
  padding: 20px;
  max-width: 500px;
}

.inline-list {
  display: inline-block;
}
</style>