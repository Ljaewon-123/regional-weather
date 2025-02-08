<template>
  <div>
    <pre>
      {{ values }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { useForm } from 'vee-validate';


const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"


const { values } = useForm();

</script>