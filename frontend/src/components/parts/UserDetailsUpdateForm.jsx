import { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
import { Authentication, IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication';
import { useAuth } from '../context/AuthContext';

const UserDetailsUpdateForm = () => {
  const { t, i18n } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { getUserData, isLoggedIn, getToken } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: getUserData()?.name || '',
      surname: getUserData()?.surname || '',
      birth_year: getUserData()?.birth_year || '',
      phone_number: getUserData()?.phone_number || '',
      email: getUserData()?.email || '',
      media_name: getUserData()?.media_name || ''
    },
    criteriaMode: 'all'
  });

  const handleFormSubmit = (formData) => {
    const token = getToken();
    axios
      .put(`http://localhost:8080/api/v1/user/${getUserData().uuid}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        alert('User details updated');
      })
      .catch((error) => {});
  };
  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  return (
    <>
      <Container className="registration-form-cont</Form.Label>ainer mb-5">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="10" md="8" lg="6">
            <Card className="my-5">
              <h2 data-testid="form-title" style={{ textAlign: 'center' }}>
                {t('userDetailsUpdateForm.title')}
              </h2>
            </Card>
            <IsNotAuthenticated>
              <>
                <p>{t('userDetailsUpdateForm.userIsNotLoggedIn')}</p>
              </>
            </IsNotAuthenticated>
            <IsAuthenticated>
              <Form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
                <Row>
                  <Col xs="12" sm="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="name">{t('userDetailsUpdateForm.name')}</Form.Label>
                      <Form.Control
                        data-testid="name-input"
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        placeholder={t('userDetailsUpdateForm.namePlaceholder')}
                        {...register('name', {
                          required: t('userDetailsUpdateForm.required'),
                          minLength: {
                            value: 2,
                            message: t('userDetailsUpdateForm.nameMinLength')
                          },
                          maxLength: {
                            value: 50,
                            message: t('userDetailsUpdateForm.nameMaxLength')
                          },
                          pattern: {
                            value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/,
                            message: t('userDetailsUpdateForm.namePattern')
                          }
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-danger mb-1 "
                              style={{ fontSize: '14px' }}
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="12" sm="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="surname">
                        {t('userDetailsUpdateForm.surname')}
                      </Form.Label>

                      <Form.Control
                        data-testid="surname-input"
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder={t('userDetailsUpdateForm.surnamePlaceholder')}
                        {...register('surname', {
                          required: t('userDetailsUpdateForm.required'),
                          minLength: {
                            value: 2,
                            message: t('userDetailsUpdateForm.surnameMinLength')
                          },
                          maxLength: {
                            value: 50,
                            message: t('userDetailsUpdateForm.surnameMaxLength')
                          },
                          pattern: {
                            value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/,
                            message: t('userDetailsUpdateForm.surnamePattern')
                          }
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="surname"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                              {message}
                            </p>
                          ))
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">{t('userDetailsUpdateForm.email')}</Form.Label>

                  <Form.Control
                    data-testid="email-input"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    autoComplete="email"
                    {...register('email', {
                      required: t('userDetailsUpdateForm.required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: t('userDetailsUpdateForm.emailPattern')
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </Form.Group>
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="birth_year">
                        {t('userDetailsUpdateForm.birthYear')}
                      </Form.Label>
                      <Form.Control
                        data-testid="birth-year-input"
                        type="number"
                        name="birth_year"
                        id="birth_year"
                        max={new Date().getFullYear()}
                        placeholder={t('userDetailsUpdateForm.birthYearPlaceholder')}
                        {...register('birth_year', {
                          required: t('userDetailsUpdateForm.required'),
                          maxLength: {
                            value: 4,
                            message: t('userDetailsUpdateForm.birthYearLength')
                          },
                          minLength: {
                            value: 4,
                            message: t('userDetailsUpdateForm.birthYearLength')
                          },
                          max: {
                            value: new Date().getFullYear(),
                            message: t('userDetailsUpdateForm.birthYearMax')
                          },
                          min: {
                            value: new Date().getFullYear() - 120,
                            message: t('userDetailsUpdateForm.birthYearMin')
                          }
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="birth_year"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                              {message}
                            </p>
                          ))
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="phone_number">
                        {t('userDetailsUpdateForm.phoneNumber')}
                      </Form.Label>
                      <Controller
                        name="phone_number"
                        control={control}
                        rules={{
                          validate: (value) =>
                            isValidPhoneNumber(`${value}`) || t('userDetailsUpdateForm.phoneError'),
                          required: t('registrationPage.required')
                        }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            data-testid="phone-input"
                            value={value}
                            onChange={onChange}
                            defaultCountry="LT"
                            international
                            id="phone_number"
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="phone_number"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-danger mx-5 mb-1 "
                              style={{ fontSize: '14px' }}
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="activity">{t('userDetailsUpdateForm.activity')}</Form.Label>

                  <Form.Select
                    data-testid="activity-input"
                    name="activity"
                    id="activity"
                    size={1}
                    value={selectedActivity}
                    onChange={handleChangeActivity}
                  >
                    <option value="freelanceWorker">{t('userDetailsUpdateForm.work1')}</option>
                    <option value="mediaWorker">{t('userDetailsUpdateForm.work2')}</option>
                  </Form.Select>

                  {selectedActivity === 'mediaWorker' && (
                    <>
                      <Form.Label htmlFor="media_name" className="mt-3">
                        {t('userDetailsUpdateForm.mediaName')}
                      </Form.Label>
                      <Form.Control
                        data-testid="media-name-input"
                        id="media_name"
                        as="textarea"
                        {...register('media_name', {
                          required: t('userDetailsUpdateForm.required'),
                          maxLength: {
                            value: 50,
                            message: t('userDetailsUpdateForm.mediaNameMaxLength')
                          }
                        })}
                      ></Form.Control>
                      <ErrorMessage
                        errors={errors}
                        name="media_name"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                              {message}
                            </p>
                          ))
                        }
                      />
                    </>
                  )}
                </Form.Group>
                <Button variant="secondary" type="submit" data-testid="submit-button">
                  {t('userDetailsUpdateForm.button')}
                </Button>
              </Form>
            </IsAuthenticated>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetailsUpdateForm;
