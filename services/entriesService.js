import { Ok, Err } from "../result.js";
import {
  getAll,
  findById,
  create,
  updateById,
  removeById,
} from "../repositories/entriesRepository.js";
import { toEntryDto } from "../dtos/entryDto.js";

function isOnlyWhitespace(str) {
  return str.trim().length === 0;
}

const validateEntry = ({ title, body }) => {
  if (!title || !body)
    return Err({ status: 400, message: "title and body are required" });
  if (isOnlyWhitespace(String(title)) || isOnlyWhitespace(String(body))) {
    return Err({ status: 400, message: "title and body cannot be whitespace" });
  }

  return Ok({ title, body });
};

export const listEntries = async () => (await getAll()).map(toEntryDto);

export const createEntry = async (data) => {
  const result = validateEntry(data);
  if (!result.ok) return result;
  return Ok(toEntryDto(await create(result.value)));
};

export const updateEntry = async (id, data) => {
  const existing = await findById(id);
  if (!existing) return Err({ status: 404, message: "Entry not found" });

  const result = validateEntry(data);
  if (!result.ok) return result;
  return Ok(toEntryDto(await updateById(id, result.value)));
};

export const deleteEntry = async (id) => {
  const existing = await findById(id);
  if (!existing) return Err({ status: 404, message: "Entry not found" });
  await removeById(id);
  return Ok(null);
};
