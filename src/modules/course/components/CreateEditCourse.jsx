import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Checkbox, Col, Form, Input, InputNumber, Row, Space} from "antd";
import {get} from "lodash";
import usePutQuery from "../../../hooks/api/usePutQuery.js";

const CreateEditCourse = ({itemData,setIsModalOpen,refetch}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isActive, setIsActive] = useState(get(itemData,'active',true));
    const { mutate, isLoading } = usePostQuery({
        listKeyId: KEYS.course_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePutQuery({
        listKeyId: KEYS.course_list,
        hideSuccessToast: false
    });

    useEffect(() => {
        form.setFieldsValue({
            name: get(itemData,'name'),
            channelId: get(itemData,'channelId'),
            discount: get(itemData,'discount'),
            number: get(itemData,'number'),
            price: get(itemData,'price'),
        });
    }, [itemData]);

    const onFinish = (values) => {
        const formData = {
            ...values,
            active: isActive
        }
        if (itemData) {
            mutateEdit(
                { url: `${URLS.course_edit}/${get(itemData,'id')}`, attributes: formData },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }else {
            mutate(
                { url: URLS.course_add, attributes: formData },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    label={t("Name")}
                    name="name"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("Channel id")}
                    name="channelId"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Space style={{width: "100%"}} size={"middle"}>
                    <Form.Item
                        label={t("Discount")}
                        name="discount"
                        rules={[{required: true,}]}
                    >
                        <InputNumber style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item
                        label={t("Price")}
                        name="price"
                        rules={[{required: true,}]}
                    >
                        <InputNumber style={{width: "100%"}}/>
                    </Form.Item>
                </Space>

                <Form.Item
                    label={t("Order")}
                    name="number"
                    rules={[{required: true,}]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="active"
                    valuePropName="active"
                >
                    <Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)}>{t("is Active")} ?</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading || isLoadingEdit}>
                        {itemData ? t("Edit") : t("Create")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEditCourse;
