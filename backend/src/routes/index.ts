import { Request, Response, Router } from "express";
import { promises as fs } from "fs";
import * as path from "path";
import { Register } from "../@types";

const router = Router();
const FILENAME: string = path.join(__dirname, "../data/registros.json");

async function getData(): Promise<Register[]> {
  try {
    const data = await fs.readFile(FILENAME, "utf-8");
    if (data.trim().length === 0) {
      return [];
    }
    return JSON.parse(data) as Register[];
  } catch (error) {
    throw new Error(
      `Erro ao ler ou parsear o arquivo ${(error as Error).message}`
    );
  }
}

async function setData(newRegister?: Register): Promise<void> {
  try {
    let registerList = await getData();
    if (newRegister) {
      registerList.push(newRegister);
    } else {
      registerList = [];
    }
    await fs.writeFile(
      FILENAME,
      JSON.stringify(registerList, null, 2),
      "utf-8"
    );
  } catch (error) {
    throw new Error(`Erro ao salvar os registros ${(error as Error).message}`);
  }
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getData();
    if (!data || data?.length == 0) {
      res.status(200).json({ message: "Registro vazio", data: [] });
    } else {
      res.status(200).json({ message: "Lista de Registros", data });
    }
  } catch (error) {
    res.status(500).json({
      message: `Erro ao obter registros`,
      error: (error as Error).message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { interval } = req.body;
    if (!interval) {
      res.status(400).json({ message: "Campo 'interval' é obrigatório." });
    }
    const now = new Date();
    const data = await getData();
    const newRegister: Register = {
      id: data.length + 1,
      interval,
      date: now.toLocaleDateString("pt-br"),
      time: now.toLocaleTimeString("pt-br"),
    };
    await setData(newRegister);
    res
      .status(201)
      .json({ message: "Registro adicionado com sucesso", newRegister });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao adicionar registro",
      error: (error as Error).message,
    });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    await setData();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erro ao remover registros",
      error: (error as Error).message,
    });
  }
});

export default router;
