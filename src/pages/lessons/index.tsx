import { type RouterOutputs, api } from "~/utils/api";
import Divider from "~/components/divider";
import { useState } from "react";
import { Toast } from "~/components/toast";
import type { RouterInputs } from "~/utils/api";

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

const NewLessonForm = ({
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: RouterInputs["lesson"]["create"]) => void;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    onSubmit({
      title: target.title.value,
      description: target.description.value,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-bold">Create a New Lesson</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block">
            Title:
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full border-2 border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block">
            Description:
          </label>
          <textarea
            id="description"
            required
            className="w-full border-2 border-gray-300 p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
        >
          Create Lesson
        </button>
      </form>
    </div>
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
