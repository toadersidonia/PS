import { useEffect, useState } from "react";  //pentru a tine minte datele despre postari si sa le actualizam cand se schimba ceva
import { postService } from "../services/postService"; //serviciu care contine functii pentru a face cereri catre backend legate de postari
import type { Post } from "../types/Post";
import { useAuth } from "./useAuth";

export function usePosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);//tinem minte lista de postari, initial e goala pentru ca la inceput nu am incarcat nicio postare

  //nu putem face direct modificari pe posts
  //folosim setPosts pentru a actualiza lista de postari

  //se apeleaza usePosts pentru prima data si atunci facem cerere catre BE sa luam toate postarile
  // useEffect(() => {
  //   postService.getAll().then(setPosts);
  // }, []);

  useEffect(() => {
  postService.getAll().then((data) =>
    setPosts(
      data.map((p) => ({
        ...p,
        myVote: null,
      }))
    )
  );
}, []);


  //functie care verifica daca utilizatorul curent poate edita postarea, adica daca e autorul postarii
  const canEdit = (post: Post) => {
    return user?.username === post.author;
  };

  //functie care adauga o postare noua, primind ca parametru un obiect cu campurile postarii 
  const addPost = async (post: Partial<Post>) => {
    if (!user) return;

    const created = await postService.create(post, Number(user.id));//apeleaza functia de creare din postService

    setPosts((prev) => [created, ...prev]); //adaugam postarea noua in lista de postari, punand-o la inceputul listei
  };

  const updatePost = async (id: string, data: Partial<Post>) => {
    if (!user) return;

    const updated = await postService.update(id, data, Number(user.id));

    //luam lista veche de postari , o parcurgem si cand dam de cel editat il inlocuim
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  const deletePost = async (id: string) => {
    if (!user) return;

    await postService.remove(id, Number(user.id));

    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // const likePost = (id: string) => {
  //   setPosts((prev) =>
  //     prev.map((p) =>
  //       p.id === id ? { ...p, likes: p.likes + 1 } : p
  //     )
  //   );
  // };

  // const dislikePost = (id: string) => {
  //   setPosts((prev) =>
  //     prev.map((p) =>
  //       p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
  //     )
  //   );
  // };


  const likePost = async (id: string) => {
    if (!user) return;

    const updated = await postService.like(id, Number(user.id));

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  const dislikePost = async (id: string) => {
    if (!user) return;

    const updated = await postService.dislike(id, Number(user.id));

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

//   const closeComments = async (id: string) => {
//   if (!user) return;

//   const updated = await postService.closeComments(id, Number(user.id));

//   setPosts((prev) =>
//     prev.map((p) => (p.id === id ? updated : p))
//   );
// };

  const closeComments = async (id: string) => {
    if (!user) return;

    try {
      await postService.closeComments(id, Number(user.id));

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "EXPIRED" } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // const updatePostStatus = (id: string, status: Post["status"]) => {
  //   setPosts((prev) =>
  //     prev.map((p) =>
  //       p.id === id ? { ...p, status } : p
  //     )
  //   );
  // };

  //returnam lista de postari si functiile pentru a adauga, edita, sterge si verifica daca se poate edita o postare
  return {
    posts,
    setPosts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    canEdit, 
    closeComments,
    //updatePostStatus,
  };
}