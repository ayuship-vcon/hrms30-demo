import {
  Box,
  Container,
} from '@mui/material';

import {
  LocationConfigForm,
  LocationConfigTable,
  LocationConfigTabs,
  LocationPageHeader,
} from '../components';

import { LOCATION_CONFIG } from '../core/constants';

import { useLocationConfiguration } from '../core/hooks';

export const LocationConfigurationPage =
  () => {
    const {
      activeType,
      rows,
      selectedRecord,
      selectOptions,

      changeType,
      edit,
      cancel,
      save,
      remove,
    } = useLocationConfiguration();

    const config =
      LOCATION_CONFIG[activeType];

    return (
      <Box
        sx={{
          minHeight: '100%',
          bgcolor: '#F7F9FC',
          py: 3,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: '1800px',
          }}
        >
          <Box mb={3}>
            <LocationPageHeader />
          </Box>

          <Box mb={2}>
            <LocationConfigTabs
              value={activeType}
              onChange={changeType}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',

                lg:
                  'minmax(0, 1.65fr) minmax(390px, 1fr)',
              },

              gap: 2,

              // important:
              // both cards will get same height
              alignItems: 'stretch',
            }}
          >
            <LocationConfigTable
              config={config}
              rows={rows}
              onEdit={edit}
              onDelete={remove}
            />

            <LocationConfigForm
              key={activeType}
              config={config}
              selectedRecord={
                selectedRecord
              }
              selectOptions={
                selectOptions
              }
              onSave={save}
              onCancel={cancel}
            />
          </Box>
        </Container>
      </Box>
    );
  };