import { useState } from "react";
import { Toast } from "~/components/toast";
import { api } from "~/utils/api";

type NewLessonForm = {
  title: string;
  description: string;
};

const NewLessonForm = ({
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: () => Promise<any>;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    const data: NewLessonForm = {
      title: target.title.value,
      description: target.description.value,
    };
    onSubmit(data);
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
          // disabled={createNewLesson.isLoading}
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default NewLessonForm;
