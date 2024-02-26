import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const UserCompetitionsListPage = () => {
  const [t] = useTranslation();

  const [competitions, setCompetitions] = useState([null]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO remove this (only for test)

    //return;

    setTimeout(() => {
      setCompetitions([{}, {}, {}]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminCompetitionPage.title')}</h3>
        </Card>
      </Container>

      <ActionList />

      {!!!isLoading && !!competitions && <CompetitionList competitions={competitions} />}
    </>
  );
};

const CompetitionList = ({ competitions }) => {
  const [t] = useTranslation();

  const list = competitions.map((competition, i) => {
    return <CompetitionSingle competition={competition} key={i} />;
  });

  return (
    <Container className="justify-content-xl-center">
      <Table responsive hover striped className="lsf-table">
        <thead className="table-light">
          <tr>
            <th className="col-4">{t('UserCompetitionsRequestPage.competitionName')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

const CompetitionSingle = ({ competition }) => {
  const [t] = useTranslation();

  const handleSelect = () => {
    console.log('Handle Info');
  };

  return (
    <tr>
      <td className="col-12">Competition name</td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={handleSelect}
          >
            <span className="material-icons">visibility</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

const ActionList = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleParticipate = () => {
    navigate('/user-competition-request');
  };

  return (
    <>
      <Container className="justify-content-xl-center my-3">
        <Row className="justify-content-end gap-2">
          <Col xs="12" lg="3">
            <Button className="lsf-button" onClick={handleParticipate}>
              {t('adminCompetitionPage.viewParticipantRequest')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserCompetitionsListPage;
