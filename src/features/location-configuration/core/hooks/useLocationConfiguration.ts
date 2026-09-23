import {
  useMemo,
  useState,
} from 'react';

import {
  COUNTRY_OPTIONS,
  MOCK_CITIES,
  MOCK_COUNTRIES,
  MOCK_STATES,
  STATE_OPTIONS,
} from '../constants';

import type {
  LocationFormValues,
  LocationRecord,
  LocationSelectOptions,
  LocationType,
} from '../types';

interface LocationData {
  country: LocationRecord[];
  state: LocationRecord[];
  city: LocationRecord[];
}

export const useLocationConfiguration =
  () => {
    const [
      activeType,
      setActiveType,
    ] =
      useState<LocationType>(
        'country',
      );

    const [
      selectedRecord,
      setSelectedRecord,
    ] =
      useState<LocationRecord | null>(
        null,
      );

    const [data, setData] =
      useState<LocationData>({
        country: MOCK_COUNTRIES,
        state: MOCK_STATES,
        city: MOCK_CITIES,
      });

    const rows =
      data[activeType];

    const selectOptions =
      useMemo<LocationSelectOptions>(
        () => {
          switch (activeType) {
            case 'state':
              return {
                countryName:
                  COUNTRY_OPTIONS,
              };

            case 'city':
              return {
                countryName:
                  COUNTRY_OPTIONS,

                stateName:
                  STATE_OPTIONS,
              };

            default:
              return {};
          }
        },
        [activeType],
      );

    const changeType = (
      type: LocationType,
    ) => {
      setActiveType(type);
      setSelectedRecord(null);
    };

    const edit = (
      record: LocationRecord,
    ) => {
      setSelectedRecord(record);
    };

    const cancel = () => {
      setSelectedRecord(null);
    };

    const save = (
      values: LocationFormValues,
    ) => {
      setData((previous) => {
        const current =
          previous[activeType];

        if (selectedRecord) {
          return {
            ...previous,

            [activeType]:
              current.map(
                (record) =>
                  record.id ===
                  selectedRecord.id
                    ? {
                        ...record,
                        ...values,
                      }
                    : record,
              ),
          };
        }

        const nextId =
          current.length === 0
            ? 1
            : Math.max(
                ...current.map(
                  (record) =>
                    record.id,
                ),
              ) + 1;

        const newRecord: LocationRecord =
          {
            id: nextId,
            active:
              values.active,
            countryName:
              values.countryName ||
              undefined,
            stateName:
              values.stateName ||
              undefined,
            cityName:
              values.cityName ||
              undefined,
          };

        return {
          ...previous,

          [activeType]: [
            ...current,
            newRecord,
          ],
        };
      });

      setSelectedRecord(null);
    };

    const remove = (
      record: LocationRecord,
    ) => {
      setData((previous) => ({
        ...previous,

        [activeType]:
          previous[
            activeType
          ].filter(
            (item) =>
              item.id !==
              record.id,
          ),
      }));

      if (
        selectedRecord?.id ===
        record.id
      ) {
        setSelectedRecord(null);
      }
    };

    return {
      activeType,
      rows,
      selectedRecord,
      selectOptions,

      changeType,
      edit,
      cancel,
      save,
      remove,
    };
  };