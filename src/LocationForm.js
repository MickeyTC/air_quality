import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styled from 'styled-components'
import createPersistedState from 'use-persisted-state'
import {
  convertToSelectOptions,
  getCities,
  getCountries,
  getStates,
} from './utils'

const useCountriesState = createPersistedState('countries')
const useStatesState = createPersistedState('states')
const useCitiesState = createPersistedState('cities')

const Container = styled.div`
  background-color: rgb(255, 255, 245);
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  min-width: 250px;
  max-width: 500px;
  z-index: 51;
`

const Wrapper = styled.div`
  margin: 0.8em;
  width: 100%;
`

const Label = styled.div`
  color: #333333;
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 0.4em;
`

const LocationSelect = styled(Select)``

const Button = styled.button`
  width: 5em;
  color: #ffffff;
  background-color: #1976d2;
  padding: 5px 15px;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  outline: 0;
  text-transform: uppercase;
  margin: 1.5em 0.5em 0.5em 0.5em;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: ease background-color 250ms;
  border: 0;
  &:hover {
    background-color: rgb(17, 82, 147);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    cursor: default;
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12);
  }
`

const LocationForm = props => {
  const {
    initialLocation = {},
    onAdd = () => {
      console.log('add')
    },
    onClose = () => {
      console.log('close')
    },
  } = props
  const [countries, setCountries] = useCountriesState()
  const [states, setStates] = useStatesState()
  const [cities, setCities] = useCitiesState()

  const [selectedCountry, setSelectedCountry] = useState(
    initialLocation?.country
  )
  const [selectedState, setSelectedState] = useState(initialLocation?.state)
  const [selectedCity, setSelectedCity] = useState(initialLocation?.city)

  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!countries) {
        setLoadingCountries(true)
        setCountries(await getCountries())
        setLoadingCountries(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      const country = selectedCountry
      if (country && !states?.[country]) {
        setLoadingStates(true)
        const data = await getStates(country)
        setStates(states => ({ ...states, [country]: data }))
        setLoadingStates(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry])

  useEffect(() => {
    ;(async () => {
      const country = selectedCountry
      const state = selectedState
      if (country && state && !cities?.[country]?.[state]) {
        setLoadingCities(true)
        const data = await getCities(state, country)
        setCities(cities => ({
          ...cities,
          [country]: cities?.[country]
            ? { ...cities[country], [state]: data }
            : { [state]: data },
        }))
        setLoadingCities(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState])

  const onSelectCountry = useCallback(
    option => {
      setSelectedCountry(option.value)
      setSelectedState('')
      setSelectedCity('')
    },
    [setSelectedCountry, setSelectedState, setSelectedCity]
  )

  const onSelectState = useCallback(
    option => {
      setSelectedState(option.value)
      setSelectedCity('')
    },
    [setSelectedState, setSelectedCity]
  )

  const onSelectCity = useCallback(
    option => {
      setSelectedCity(option.value)
    },
    [setSelectedCity]
  )

  const countriesOptions = useMemo(() => convertToSelectOptions(countries), [
    countries,
  ])
  const statesOptions = useMemo(
    () => convertToSelectOptions(states?.[selectedCountry]),
    [states, selectedCountry]
  )
  const citiesOptions = useMemo(
    () => convertToSelectOptions(cities?.[selectedCountry]?.[selectedState]),
    [cities, selectedCountry, selectedState]
  )

  const onClickAdd = () => onAdd(selectedCountry, selectedState, selectedCity)

  return (
    <Container>
      <Wrapper>
        <Label>{'Country'}</Label>
        <LocationSelect
          name='country'
          options={countriesOptions}
          tabIndex='0'
          value={
            countriesOptions.find(option => option.value === selectedCountry) ||
            ''
          }
          onChange={onSelectCountry}
          isDisabled={loadingCountries}
          isLoading={loadingCountries}
        />
      </Wrapper>
      <Wrapper>
        <Label>{'State'}</Label>
        <LocationSelect
          name='state'
          options={statesOptions}
          tabIndex='1'
          value={
            statesOptions.find(option => option.value === selectedState) || ''
          }
          onChange={onSelectState}
          isDisabled={loadingStates || !statesOptions.length}
          isLoading={loadingStates}
        />
      </Wrapper>
      <Wrapper>
        <Label>{'City'}</Label>
        <LocationSelect
          name='city'
          options={citiesOptions}
          tabIndex='2'
          value={
            citiesOptions.find(option => option.value === selectedCity) || ''
          }
          onChange={onSelectCity}
          isDisabled={loadingCities || !citiesOptions.length}
          isLoading={loadingCities}
        />
      </Wrapper>
      <Button
        onClick={onClickAdd}
        disabled={!selectedCountry || !selectedState || !selectedCity}
      >
        {'ADD'}
      </Button>
    </Container>
  )
}

LocationForm.propTypes = {
  initialLocation: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
}

export default LocationForm
