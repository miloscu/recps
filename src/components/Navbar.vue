<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link v-bind:to="{ name: 'Index' }">
          <span class="nav-title center-align valign-wrapper">reCPs</span>
        </router-link>
        <a href="" class="btn btn-floating btn-large halfway-fab pink">
          <router-link v-bind:to="{ name: 'AddRecipe' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
        <button
          v-on:click="
            DualFlipClassSwitch('html', 'dark', 'snow-white', 'ColorMode')
          "
        >
          🌓 ⇄ 💡
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },

  methods: {
    ClassSwitch(TagName, ClassName, MemoryName) {
      /* We use const variables to avoid logic errors, if their values change during process. */

      const ClassWasActive = document
        .querySelector(TagName)
        .classList.contains(ClassName);

      const OldMemory = window.localStorage.getItem(MemoryName);

      /* If class is New and NOT-active. We remove possible OldMemory class.
   Deep Clean memory cell. Activate and remember new CSS class in clean memory. 
 */

      if (!ClassWasActive && OldMemory !== ClassName) {
        if (OldMemory) {
          document.querySelector(TagName).classList.remove(OldMemory);
          window.localStorage.removeItem(MemoryName);
        }

        document.querySelector(TagName).classList.add(ClassName);
        window.localStorage.setItem(MemoryName, ClassName);
      } else {

      /* Else CSS class was already active OR the switch memory was not clean.
      We toggle given class. Remove possible OldMemory class. Deep Clean memory cell. 
   */
        document.querySelector(TagName).classList.toggle(ClassName);

        if (OldMemory) {
          document.querySelector(TagName).classList.remove(OldMemory);
          window.localStorage.removeItem(MemoryName);
        }
      }

      return false;
    },

    DualFlipClassSwitch(TagName, Class1, Class2, MemoryName) {
      const ClassWasActive = document
        .querySelector(TagName)
        .classList.contains(Class1);

      if (!ClassWasActive) {
        this.ClassSwitch(TagName, Class1, MemoryName);
      } else {
        this.ClassSwitch(TagName, Class2, MemoryName);
      }

      return false;
    },
  },
};
</script>

<style scoped>
.nav-title {
  padding-left: 20px;
}
</style>

<style>

:root,
:root.snow-white {
  --color-html: #f9f9f9;
  --color-body: #fdfdfd;
  --color-text: #051105;
  --color-link: #1122d8;
  --color-selected-text: #000;
  --color-selected-bg: #cf7;
}


@media screen and (prefers-color-scheme: dark) {
  html:not(.snow-white) {
    --color-html: #0e0b0b;
    --color-body: #1a1010;
    --color-text: #d1d1d1;
    --color-link: #4fbcff;
    --color-selected-text: #000;
    --color-selected-bg: #cf7;
  }
}


html.dark {
  --color-html: #0e0b0b;
  --color-body: #1a1010;
  --color-text: #d1d1d1;
  --color-link: #4fbcff;
  --color-selected-text: #000;
  --color-selected-bg: #cf7;
}

body {
  background: var(--color-body);
  color: var(--color-text);
}

::selection {
  background: var(--color-selected-bg);
  color: var(--color-selected-text);
}

a:link,
a:visited {
  color: var(--color-link);
}
a:hover {
  border-bottom: 0.185rem dashed var(--color-link);
}

.docker {
  color: var(--color-text);
}

.docker:hover,
.docker:active {
  background: var(--color-body);
  color: var(--color-text);
}
</style>