import React from "react";
import { ErrorBlock, Button } from 'antd-mobile';
import styled from "styled-components";

/* 样式处理 */
const Page404Box = styled.div`
    padding-top: 100px;
    font-size: 40px;

    .adm-error-block-image{
        height: 400px;
    }

    .adm-error-block-description,
    .adm-error-block-description-title{
        font-size: 28px;
    }

    .btn{
        margin-top: 50px;
        display: flex;
        justify-content: center;

        .adm-button{
            margin: 0 20px;
        }
    }
`;

const Page404 = function Page404(props) {
  let { navigate } = props;

  return <Page404Box>
    <ErrorBlock status="empty" title="The page you visited is not found" description="Try some other pages to visit please" />
    <div className="btn">
      <Button color="warning"
        onClick={() => {
          navigate(-1);
        }}>
        Back
      </Button>

      <Button color="primary"
        onClick={() => {
          navigate('/', { replace: true });
        }}>
        Back to HomePage
      </Button>
    </div>
  </Page404Box>;
};
export default Page404;