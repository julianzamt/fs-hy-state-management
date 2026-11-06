const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const create = async (anecdote) => {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: anecdote, votes: 0 }),
  };

  const response = await fetch(baseUrl, opts);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const vote = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch anecdote");
  }

  const anecdote = await res.json();

  const opts = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: anecdote.content,
      votes: anecdote.votes + 1,
    }),
  };

  const res2 = await fetch(`${baseUrl}/${id}`, opts);

  return await res2.json();
};

export default { getAll, create, vote };
