import React, {Dispatch, SetStateAction, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getLocations } from '@/services/locationService';

const MapFilter = ({ setFilteredMarkers, setFilterParam }: {setFilteredMarkers: Dispatch<SetStateAction<[] | string[]>>; setFilterParam: Dispatch<SetStateAction<string>>}) => {
  const filterInitState = [
    {
      type: 1,
      name: 'Čepovi',
      selected: true,
    },
    {
      type: 2,
      name: 'PET',
      selected: false,
    },
    {
      type: 3,
      name: 'Limenke',
      selected: false,
    },
    {
      type: 4,
      name: 'Papir',
      selected: false,
    },
    {
      type: 5,
      name: 'Staklo',
      selected: false,
    },
    {
      type: 6,
      name: 'Baterije',
      selected: false,
    },
  ];

  const [filters, setFilters] = useState(filterInitState);

  const setFilter = async (type: number) => {
    const locations = await getLocations(type.toString());
    setFilteredMarkers(locations);

    const updatedFilters = filters.map(filter => {
      const newSelectedState = (filter.selected = filter?.type == type);
      return { ...filter, selected: newSelectedState };
    });

    setFilters(updatedFilters);
    setFilterParam(type?.toString());
  };

  return (
    <View style={styles.filtersContainer}>
      {filters &&
        filters.map(filter => (
          <TouchableOpacity
            key={filter.type}
            style={
              filter.selected
                ? [styles.filterItem, styles.selectedFilterItem]
                : styles.filterItem
            }
            onPress={() => setFilter(filter.type)}>
            <Text
              style={
                filter.selected ? styles.selectedFilterItem : styles.filterText
              }>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedFilterItem: {
    backgroundColor: '#FF6600',
    color: '#fff',
    fontWeight: '600',
  },
  filterText: {
    color: '#999999',
    fontWeight: '400',
  },
  filtersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    zIndex: -100,
  },
  filterItem: {
    width: '25%',
    margin: 4,
    borderRadius: 10,
    borderColor: '#FF6600',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: '#00405C',
    backgroundColor: '#fff',
  },
});

export default MapFilter;
