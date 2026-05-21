import CommentCard from "./CommentCard";
import CommentComposer from "./CommentComposer";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../hooks/useAuth";
//cand avem {} -> name export pt ca nu avem doar un lucru prinicpal
//cand nu avem -> defualt export pt ca avem o singura componenta principa

//parametrii PRIMITI DIN EXTERIOR - componenta primeste informatii de la componenta parinte 
type Props = {
  postId: string; //are nevoie sa stie pt ce post ia comentariile
  onPostUpdate?: (updatedPost: any) => void;
};

//export = permite altor fisiere sa foloseasca functia asta
export default function CommentSection({ postId, onPostUpdate }: Props) { //face deconstructing
  const { user } = useAuth(); //ia user ul logat

  //IN REACT FUNCTIILE SUNT first class citizens, adica usnt tratate ca orice alta valoare, se pot salva in varabile
  //trimite ca parametrii, tirmite ca props
  const {
    comments,
    addComment,
    remove,
    editComment,
    isOwner,
    voteComment
  } = useComments(postId, user ?? null, onPostUpdate);

  //ce vedem noi pe ecran
  return (
    <div className="mt-4 pt-4 border-t border-black/5">

      {/* ii trimitem la commentcomposer functia de addComment, care e un hook ce trimite la backend chestii */}
      <CommentComposer onAddComment={addComment} /> 

      {/* pt fiecare comentariu creeaza un coment card */}
      {/* transforma array ul in componente ui */}
      {/* facem component composition, adica creeam compoentne din alte compoente */}
      <div className="space-y-3">
        {comments.map((c) => (
          <CommentCard 
            key={c.id}
            comment={c}
            onDelete={remove}
            onEdit={editComment}
            canEdit={isOwner}
            onVote={voteComment}
          />
        ))}
      </div>

    </div>
  );
}