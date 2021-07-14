import { useMemo } from "react";
import faker from "faker/locale/ko";
import Table from "./Table";
import Search_Form from "./Search_Form";

faker.seed(100);

function Data() {
    const columns = useMemo(
        () => [
            {
                accessor : "name",
                Header : "이름",
            },
            {
                accessor : "email",
                Header : "이메일",
            },
            {
                accessor : "phone",
                Header : "전화번호",
            },
        ],
        []
    );

    const data = useMemo(
        () => Array(53).fill().map(
            () => ({ name : faker.name.lastName() + faker.name.firstName(),
                     email : faker.internet.email(),
                     phone : faker.phone.phoneNumber(),
                    })
            ),
        []
    );

    return (
    <Table columns = {columns} data = {data}></Table>
    );
}

export default Data;