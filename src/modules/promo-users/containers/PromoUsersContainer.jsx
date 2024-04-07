import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {Button, Input, Pagination, Popconfirm, Row, Space, Switch, Table} from "antd";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {LockOutlined, UnlockOutlined} from "@ant-design/icons";

const PromoUsersContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey,setSearchKey] = useState();
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.promo_users_list,
        url: URLS.promo_users_list,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });

    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Promo name"),
            dataIndex: "promoName",
            key: "promoName",
        },
        {
            title: t("Owner chat id"),
            dataIndex: "promoOwner",
            key: "ownerChatId",
            render: (props) => {
                return get(props,'chatId')
            }
        },
        {
            title: t("Owner name"),
            dataIndex: "promoOwner",
            key: "ownerName",
            render: (props) => {
                return get(props,'name')
            }
        },
        {
            title: t("Owner username"),
            dataIndex: "promoOwner",
            key: "ownerUserName",
            render: (props) => {
                return get(props,'username')
            }
        },
        {
            title: t("Owner phone"),
            dataIndex: "promoOwner",
            key: "ownerPhone",
            render: (props) => {
                return get(props,'phoneNumber')
            }
        },
        {
            title: t("User chat id"),
            dataIndex: "promoUser",
            key: "userChatId",
            render: (props) => {
                return get(props,'chatId')
            }
        },
        {
            title: t("User name"),
            dataIndex: "promoUser",
            key: "userName",
            render: (props) => {
                return get(props,'name')
            }
        },
        {
            title: t("User username"),
            dataIndex: "promoUser",
            key: "userUserName",
            render: (props) => {
                return get(props,'username')
            }
        },
        {
            title: t("User phone"),
            dataIndex: "promoUser",
            key: "userPhone",
            render: (props) => {
                return get(props,'phoneNumber')
            }
        },
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
        </Container>
    );
};

export default PromoUsersContainer;
