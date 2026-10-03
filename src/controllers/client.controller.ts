import { ClientModel } from "../models/client.model";
import { createOne, deleteOne, getAll, getById, updateOne } from "./crudFactory";

export const listClients = getAll(ClientModel);
export const getClient = getById(ClientModel);
export const createClient = createOne(ClientModel);
export const updateClient = updateOne(ClientModel);
export const deleteClient = deleteOne(ClientModel);
