import NoteList from '@/components/NoteList/NoteList'
import { getNotes } from '@/lib/api';
import  type {NoteTag} from '@/types/note'

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByCategory ({ params }: Props){
  const { slug } = await params;
    const rawTag = slug?.[0];
    const tag = rawTag === "all" ? undefined : (rawTag as NoteTag | undefined);
  const res = await getNotes(tag);
  console.log(res);
  

  return (
    <div>
      {res?.notes?.length > 0 && <NoteList notes={res.notes} />}
    </div>
  );
};