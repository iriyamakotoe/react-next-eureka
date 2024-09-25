"use client"

import { useState, useEffect } from 'react';
import { supabase } from "../../utils/supabase";

export default function Home() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetchData()
  },[])

  async function fetchData() {
    const { data: students } = await supabase
      .from('students')
      .select('*')

    setStudents(students)
  }

  return <>
        {students.map((student) => (
          <p key={student.id}>
      <a href={`/static/${student.id}`}>{student.name}</a>
    </p>
        ))}
  </>
}