import { useRouter } from "next/router";
import { api } from "~/utils/api";

const LessonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: lesson } = api.lesson.getOne.useQuery({ id: id as string });

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-bold">Lesson Details</h1>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            {lesson.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {lesson.description}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Author Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {lesson.author.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
