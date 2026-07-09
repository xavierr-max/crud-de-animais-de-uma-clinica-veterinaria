import express from "express";
import AnimalController from "../controllers/animal.controller.js";

const router = express.Router();

router.get("/listar", AnimalController.listarAnimais);
router.get("/buscar/:codigo", AnimalController.buscarAnimalPorCodigo);
router.post("/cadastrar", AnimalController.cadastrarAnimal);
router.put("/atualizar/:codigo", AnimalController.atualizarAnimal);
router.delete("/deletar/:codigo", AnimalController.deletarAnimal);

// Faltando:

// atualizar um por vez
// router.patch();

// deletar todos 
// router.delete();

export default router;
