import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import StatePicker from '../../components/StatePicker';
import ExpensiTextInput from '../../components/ExpensiTextInput';
import styles from '../../styles/styles';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import Text from '../../components/Text';

const propTypes = {
    /** Style for wrapping View */
    style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),

    /** Callback fired when a field changes. Passes args as fieldName, val */
    onFieldChange: PropTypes.func.isRequired,

    /** Form values */
    values: PropTypes.shape({
        /** First name field */
        firstName: PropTypes.string,

        /** Last name field */
        lastName: PropTypes.string,

        /** Address street field */
        street: PropTypes.string,

        /** Address city field */
        city: PropTypes.string,

        /** Address state field */
        state: PropTypes.string,

        /** Address zip code field */
        zipCode: PropTypes.string,

        /** Date of birth field */
        dob: PropTypes.string,

        /** Last 4 digits of SSN */
        ssnLast4: PropTypes.string,
    }),

    /** Any errors that can arise from form validation */
    errors: PropTypes.object, // TODO: Add right shape

    ...withLocalizePropTypes,
};

const defaultProps = {
    style: {},
    values: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        dob: '',
        ssnLast4: '',
    },
    errors: {},
};


class IdentityForm extends React.Component {
    constructor(props) {
        super(props);

        // Map a field to the key of the error's translation
        this.errorTranslationKeys = {
            street: 'bankAccount.error.address',
            dob: 'bankAccount.error.dob',
            ssnLast4: 'bankAccount.error.ssnLast4',
            zipCode: 'bankAccount.error.zipCode',
        };
    }

    /**
     * @param {String} inputKey
     * @returns {String}
     */
    getErrorText(inputKey) {
        return this.props.errors[inputKey] ? this.props.translate(this.errorTranslationKeys[inputKey]) : '';
    }

    render() {
        const {
            translate, values, onFieldChange, style,
        } = this.props;
        const {
            firstName, lastName, street, city, state, zipCode, dob, ssnLast4,
        } = values;
        return (
            <View style={style}>
                <View style={[styles.flexRow]}>
                    <View style={[styles.flex2, styles.mr2]}>
                        <ExpensiTextInput
                            label={`${translate('common.firstName')}`}
                            value={firstName}
                            onChangeText={value => onFieldChange('firstName', value)}
                        />
                    </View>
                    <View style={[styles.flex2]}>
                        <ExpensiTextInput
                            label={`${translate('common.lastName')}`}
                            value={lastName}
                            onChangeText={value => onFieldChange('lastName', value)}
                        />
                    </View>
                </View>
                <ExpensiTextInput
                    label={`${translate('common.dob')}`}
                    containerStyles={[styles.mt4]}
                    placeholder={translate('common.dateFormat')}
                    value={dob}
                    onChangeText={value => onFieldChange('dob', value)}
                    errorText={this.getErrorText('dob')}
                />
                <ExpensiTextInput
                    label={`${translate('common.ssnLast4')}`}
                    containerStyles={[styles.mt4]}
                    value={ssnLast4}
                    onChangeText={value => onFieldChange('ssnLast4', value)}
                    errorText={this.getErrorText('ssnLast4')}
                />
                <ExpensiTextInput
                    label={translate('common.personalAddress')}
                    containerStyles={[styles.mt4]}
                    value={street}
                    onChangeText={value => onFieldChange('street', value)}
                    errorText={this.getErrorText('street')}
                />
                <Text style={[styles.mutedTextLabel, styles.mt1]}>{translate('common.noPO')}</Text>
                <View style={[styles.flexRow, styles.mt4]}>
                    <View style={[styles.flex2, styles.mr2]}>
                        <ExpensiTextInput
                            label={translate('common.city')}
                            value={city}
                            onChangeText={value => onFieldChange('city', value)}
                        />
                    </View>
                    <View style={[styles.flex1]}>
                        <StatePicker
                            value={state}
                            onChange={value => onFieldChange('state', value)}
                        />
                    </View>
                </View>
                <ExpensiTextInput
                    label={translate('common.zip')}
                    containerStyles={[styles.mt4]}
                    value={zipCode}
                    onChangeText={value => onFieldChange('zipCode', value)}
                    errorText={this.getErrorText('zipCode')}
                />
            </View>
        );
    }
}

IdentityForm.propTypes = propTypes;
IdentityForm.defaultProps = defaultProps;
export default withLocalize(IdentityForm);
