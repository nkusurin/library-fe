import PublisherForm from "./publisherForm";

function NewPublisherPage() {
  let publisher = {
    name: "",
    address: "",
    phone: "",
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Novi nakladnik
      </h1>
      <PublisherForm publisher={publisher} isEditDisabled={false} />
    </>
  );
}

export default NewPublisherPage;
