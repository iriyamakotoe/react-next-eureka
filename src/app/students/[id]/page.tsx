'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import {Header} from '@/components/Header'
import {InputItem} from '@/components/InputItem'
import {TextAreaItem} from '@/components/TextAreaItem'


const EditStudent = ({ params }) => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = params;  // ルートからIDを取得

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  console.log(student)
  
  const defaultValues = {
    // name: student.name,
    // school: student.school,
    // grade: student.grade,
    // note: student.note,
    }

	const values = { ...defaultValues }
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', defaultValues, values })

	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState(false)

    const onSubmit = async (data) => {
		setErrorMessage('')
		await fetch(`/api/students/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok) {
				setSuccessMessage(true)
				setTimeout(() => {
					setSuccessMessage(false)
				}, 3000)
			} else {
				setErrorMessage(`エラーが発生しました：${res.status}`)
			}
		})
	}

    const handleDelete = async () => {
        const res = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });
      
        if (res.ok) {
          const data = await res.json();
          console.log(data.message); // "Student deleted successfully"
        } else {
          const errorData = await res.json();
          console.error('エラー:', errorData.error);
        }
      };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;

  return (
    <>
        <Header />
        <main>
            <h2 className="page-title">生徒情報編集</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
                <InputItem
                    register={register}
                    type="text"
                    id="name"
                    label="名前"
                    pattern={{}}
                    errors={errors.title}
                    defaultValues={student.name}
                />

                <InputItem
                    register={register}
                    type="text"
                    id="school"
                    label="学校"
                    pattern={{}}
                    errors={errors.url}
                    defaultValues={student.school}
                />

                <InputItem
                    register={register}
                    type="text"
                    id="grade"
                    label="学年"
                    pattern={{}}
                    errors={errors.detail}
                    defaultValues={student.grade}
                />

                <TextAreaItem
                    register={register}
                    type="text"
                    id="note"
                    label="メモ"
                    pattern={{}}
                    errors={errors.review}
                    defaultValues={student.note}
                />

                <p className="flex justify-center mt-10">
                    <button type="submit">送信</button>
                </p>
                <p className="error form-error mt-5 text-center">{errorMessage}</p>

                {successMessage && <p className="success bg-orange-50 text-orange-600 mb-10 p-3">登録しました！</p>}
            </form>

            <p className="flex justify-center mt-10">
                    <button type="button" onClick={handleDelete}>削除</button>
                </p>
        </main>
    </>
)
};

export default EditStudent;