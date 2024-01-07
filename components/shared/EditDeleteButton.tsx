"use client";

import { deletAnswerById } from "@/lib/actions/answer.action";
import { deleteQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteButton = ({ type, itemId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/question/edit/${itemId.toString()}`);
  };
  const handleDelete = async () => {
    if (type === "question") {
      deleteQuestionById({
        questionId: itemId.toString(),
        path,
      });
    } else if (type === "answer") {
      deletAnswerById({
        answerId: itemId.toString(),
        path,
      });
      // da
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit-icon"
          height={16}
          width={16}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        ></Image>
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="delete-icon"
        height={16}
        width={16}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      ></Image>
    </div>
  );
};

export default EditDeleteButton;
