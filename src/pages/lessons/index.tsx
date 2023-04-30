import { type RouterOutputs, api } from "~/utils/api";
import NewLessonForm from "./create";
import Divider from "~/components/divider";
import { useState } from "react";
import { Toast } from "~/components/toast";

const LessonItem = ({
  lesson,
  deleteAction,
}: {
  lesson: RouterOutputs["lesson"]["getAll"][number];
  deleteAction: (data: { id: string }) => void;
}) => {
  const handleDelete = () => {
    deleteAction({ id: lesson.id });
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2">{lesson.title}</td>
      <td className="p-2">{lesson.description}</td>
      <td className="p-2">
        <button
          onClick={handleDelete}
          className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const LessonsPage = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );

  const { data: lessons, refetch } = api.lesson.getAll.useQuery();
  const { mutate: deleteLesson } = api.lesson.delete.useMutation({
    onSuccess: async () => {
      setToastType("success");
      setToastMessage("Lesson removed successfully!");
      await refetch();
    },
    onError: (error) => {
      setToastType("error");
      setToastMessage(error.message);
    },
  });

  const { mutate: createNewLesson } = api.lesson.create.useMutation({
    onSuccess: async () => {
      setToastType("success");
      setToastMessage("Lesson created successfully!");
      await refetch();
    },
    onError: (error) => {
      setToastType("error");
      setToastMessage(error.message);
    },
  });

  const handleToastClose = () => {
    setToastMessage("");
  };

  if (!lessons) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-bold">Lessons Page</h1>
      <NewLessonForm onSubmit={createNewLesson} />

      <Divider />
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2 text-left font-semibold">Title</th>
            <th className="p-2 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              deleteAction={deleteLesson}
            />
          ))}
        </tbody>
      </table>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default LessonsPage;
