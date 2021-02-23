<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2 class="center-align indigo-text">Edit {{ recipe.title }} Recipe</h2>
    <form v-on:submit.prevent="saveChanges()">
      <div class="field title">
        <label for="title">Recipe title</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <ul v-show="!isEmpty">
          <li
            class="inline-list"
            v-for="(ingredient, index) in recipe.ingredients"
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
        <input type="text" name="instructions" v-model="recipe.instructions" />
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="pink-text p-1">{{ feedback }}</p>
        <button v-bind:class="{ disabled: isIncomplete() }" class="btn pink">
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null,
    };
  },

  methods: {
    saveChanges() {
      if (!this.isIncomplete()) {
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[!@#$%^&*()_+]/g,
          lower: true,
        });

        let ref = db.collection("recipes").doc(this.recipe.id);
        ref
          .update({
            title: this.recipe.title,
            slug: this.recipe.slug,
            ingredients: this.recipe.ingredients,
            instructions: this.recipe.instructions,
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

    deleteIngredient(ingredientToDelete) {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        (i) => i != ingredientToDelete
      );
    },
    isIncomplete() {
      return (
        this.recipe.ingredients.length == 0 ||
        this.recipe.title == null ||
        this.recipe.instructions == null
      );
    },
    addIngredient() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else if (this.recipe.ingredients.length == 0) {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
  },

  computed: {
    isEmpty() {
      return this.recipe.ingredients.length == 0;
    },
  },

  created() {
    let ref = db
      .collection("recipes")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
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