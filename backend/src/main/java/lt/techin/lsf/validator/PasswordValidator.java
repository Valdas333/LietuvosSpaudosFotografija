package lt.techin.lsf.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPasswordConstraint, String> {

    private static final String PASSWORD_PATTERN = "^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$";
    private static final int PASSWORD_MIN_LENGTH = 8;
    private static final int PASSWORD_MAX_LENGTH = 50;
    private List<String> errorMessages = new ArrayList<>();

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        errorMessages.clear();

        if (password.length() < PASSWORD_MIN_LENGTH || password.length() > PASSWORD_MAX_LENGTH) {
            errorMessages.add("Password length must be between 8 and 50 characters");
        }

        if (!Pattern.matches(PASSWORD_PATTERN, password)) {
            errorMessages.add("Password must contain only lowercase, uppercase latin letters, " +
                    "numbers and special symbols !@#$%^&*()");
        }

        if (!errorMessages.isEmpty()) {
            context.disableDefaultConstraintViolation();
            String errorMessage = String.join("; ", errorMessages);
            context.buildConstraintViolationWithTemplate(errorMessage).addConstraintViolation();
            return false;
        }

        return true;
    }
}
