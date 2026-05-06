"use client";
import css from './NotePreview.module.css'
import { useRouter,useParams } from "next/navigation";
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function NotePreviewClient() {
    const router = useRouter();
     const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
     <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{data.title}</h2>
	  </div>
      <p className={css.tag}>{data.tag}</p>
	  <p className={css.content}>{data.content}</p>
	  <p className={css.date}>{data.createdAt}</p>
      <button className={css.backBtn } onClick={() => router.back()}>Close</button>
	</div>
</div>
      </div>
  );
}