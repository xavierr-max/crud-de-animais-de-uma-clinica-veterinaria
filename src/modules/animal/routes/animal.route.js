import express from "express";
import AnimalController from "../controllers/animal.controller.js";

const router = express.Router();

router.get("/listar", AnimalController.listarAnimais);
router.get("/buscar/:matricula", AnimalController.buscarAnimalPorCodigo);
router.post("/cadastrar", AnimalController.cadastrarAnimal);
router.put("/atualizar/:matricula", AnimalController.atualizarAnimal);
router.delete("/deletar/:matricula", AnimalController.deletarAnimal);

// Faltando:

// atualizar um por vez
// router.patch();

// deletar todos 
// router.delete();

export default router;