import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {get} from "lodash";
import {Button, Input, Modal, Pagination, Popconfirm, Row, Space, Switch, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import CreateEditCourse from "../components/CreateEditCourse.jsx";

const CourseContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [itemData, setItemData] = useState(null);
    const [searchKey,setSearchKey] = useState();
    const [isCreateModalOpenCreate, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.course_list,
        url: URLS.course_list,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });
    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.course_list
    });
    const useDelete = (id) => {
        mutate({url: `${URLS.course_delete}/${id}`},{
            onSuccess: () => {
                refetch();
            }
        })
    }
    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("Channel id"),
            dataIndex: "channelId",
            key: "channelId",
        },
        {
            title: t("Discount"),
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: t("Price"),
            dataIndex: "price",
            key: "price",
        },
        {
            title: t("Order"),
            dataIndex: "number",
            key: "number",
        },
        {
            title: t("is active ?"),
            dataIndex: "active",
            key: "active",
            render: (props,data,index) => (
                <Switch disabled checked={get(data,'active')} />
            )
        },
        {
            title: t("Edit / Delete"),
            width: 120,
            fixed: 'right',
            key: 'action',
            render: (props, data, index) => (
                <Space key={index}>
                    <Button icon={<EditOutlined />} onClick={() => {
                        setIsEditModalOpen(true)
                        setItemData(data)
                    }} />
                    <Popconfirm
                        title={t("Delete")}
                        description={t("Are you sure to delete?")}
                        onConfirm={() => useDelete(get(data,'id'))}
                        okText={t("Yes")}
                        cancelText={t("No")}
                    >
                        <Button danger icon={<DeleteOutlined />}/>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <Space size={"middle"}>
                    <Input.Search
                        placeholder={t("Search")}
                        onChange={(e) => setSearchKey(e.target.value)}
                        allowClear
                    />
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        {t("New course")}
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={get(data,'data.data.content',[])}
                    bordered
                    size={"middle"}
                    pagination={false}
                    loading={isLoading}
                />

                <Row justify={"end"} style={{marginTop: 10}}>
                    <Pagination
                        current={page+1}
                        onChange={(page) => setPage(page - 1)}
                        total={get(data,'data.data.totalPages') * 10 }
                        showSizeChanger={false}
                    />
                </Row>
            </Space>

            <Modal
                title={t('Create new course')}
                open={isCreateModalOpenCreate}
                onCancel={() => setIsCreateModalOpen(false)}
                footer={null}
            >
                <CreateEditCourse
                    setIsModalOpen={setIsCreateModalOpen}
                    refetch={refetch}
                />
            </Modal>

            <Modal
                title={t("Edit course")}
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                footer={null}
            >
                <CreateEditCourse
                    itemData={itemData}
                    setIsModalOpen={setIsEditModalOpen}
                    refetch={refetch}
                />
            </Modal>
        </Container>
    );
};

export default CourseContainer;
